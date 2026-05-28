import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/axios';
import './Admin.css';


// ── Lucide React icons (SVG Direct - no font needed, never breaks in Vite) ──
import {
  LayoutDashboard, HardHat, ClipboardList, LogOut,
  Network, Search, Menu, RefreshCw, Bell, ChevronDown,
  Users, TrendingUp, Hourglass, Star, Trash2,
  ClockArrowUp, Inbox, ArrowRight, UserX, PieChart,
  CheckCircle2, XCircle, CircleDot, User, AlertTriangle, CreditCard, Settings,
} from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [stats, setStats] = useState({ workers: 0, requests: 0, pending: 0, categories: 0 });
  const [workers, setWorkers] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);


  const [complaints, setComplaints] = useState([]);

 
// fetch API
const fetchComplaints = async () => {
  try {
    const res = await API.get("/complaints/getComplaint");
    setComplaints(res.data.data || []);
  } catch (error) {
    console.error("Error fetching complaints:", error);
  } finally {
    setLoading(false);
  }
};
 
// call on tab load
useEffect(() => {
  if (activeTab === "complaints") {
    fetchComplaints();
  }
}, [activeTab]);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [workerRes, userRes] = await Promise.all([
        API.get('/workers/getWorkers', { withCredentials: true }),
        API.get('/user/getAllUsers', { withCredentials: true })
      ]);
      
      const wData = workerRes.data?.data;
      const list = wData?.worker || wData || [];
      const workerList = Array.isArray(list) ? list : [];
      setWorkers(workerList);
      
      const uData = userRes.data?.data || userRes.data || [];
      const userList = Array.isArray(uData) ? uData : [];
      setSystemUsers(userList);

      const allRequests = workerList.flatMap(w => w.requests || []);
      setStats({
        workers: workerList.length,
        requests: allRequests.length,
        pending: allRequests.filter(r => r.status === 'pending').length,
        categories: new Set(workerList.map(w => w.category).filter(Boolean)).size,
      });
      setNotification({ type: 'success', msg: 'Data refreshed' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      if (err.response?.status === 401) {
        setNotification({ type: 'error', msg: 'Session expired. Please log out and sign in again as Admin.' });
      } else {
        setNotification({ type: 'error', msg: 'Failed to fetch data from backend. Ensure server is running.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try { await API.post('/user/logoutUser', {}, { withCredentials: true }); } catch (e) { /* ignore */ }
    localStorage.removeItem('role');
    navigate('/');
  };

  // ── Derived Data ──
  const filteredWorkers = workers.filter(w =>
    `${w.firstName} ${w.lastName} ${w.email} ${w.category} ${w.city}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSystemUsers = systemUsers.filter(u =>
    `${u.fullName} ${u.email} ${u.phone} ${u.address}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allRequests = workers
    .flatMap(w => (w.requests || []).map(r => ({ ...r, worker: w })))
    .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

  const recentRequests = allRequests.slice(0, 10);

  const filteredRequests = statusFilter === 'all'
    ? allRequests
    : allRequests.filter(r => r.status === statusFilter);

  const categoryMap = workers.reduce((acc, w) => {
    const cat = w.category || 'Unknown';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const statusColor = s => ({ pending: 'warning', accepted: 'success', rejected: 'danger', completed: 'info' }[s?.toLowerCase()] || 'secondary');
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Pending';

  const navItems = [
    { id: 'dashboard',  Icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'workers',    Icon: HardHat,         label: 'Workers' },
    { id: 'requests',   Icon: ClipboardList,   label: 'Hire Requests' },
    { id: 'users',      Icon: User,            label: 'Users' },
    { id: 'complaints', Icon: AlertTriangle,   label: 'Complaints' },
    { id: 'payments',   Icon: CreditCard,      label: 'Payments' },
    { id: 'settings',   Icon: Settings,        label: 'Settings' },
  ];

  const colors = ['orange','emerald','amber','violet','rose','cyan'];

  return (
    <div className={`sc-admin ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      {/* Toast */}
      {notification && (
        <div className={`sc-toast sc-toast--${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
          {notification.msg}
        </div>
      )}

      {/* ══ SIDEBAR ══ */}
      <aside className="sc-sidebar">
        <div className="sc-sidebar__brand">
          <div className="sc-sidebar__brand-icon"><Network size={18}/></div>
          <span className="sc-sidebar__brand-name">SkillConnect</span>
        </div>

        <div className="sc-sidebar__section-label">MAIN MENU</div>
        <nav className="sc-sidebar__nav">
          {navItems.map(({ id, Icon, label }) => (
            <button key={id} className={`sc-sidebar__item ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
              <span className="sc-sidebar__item-icon"><Icon size={15}/></span>
              <span className="sc-sidebar__item-label">{label}</span>
              {activeTab === id && <span className="sc-sidebar__item-dot"></span>}
            </button>
          ))}
        </nav>

        <div className="sc-sidebar__section-label" style={{marginTop:'auto'}}>ACCOUNT</div>
        <nav className="sc-sidebar__nav">
          <button className="sc-sidebar__item sc-sidebar__item--logout" onClick={handleLogout}>
            <span className="sc-sidebar__item-icon"><LogOut size={15}/></span>
            <span className="sc-sidebar__item-label">Logout</span>
          </button>
        </nav>

        <div className="sc-sidebar__footer">
          <div className="sc-sidebar__avatar">A</div>
          <div className="sc-sidebar__admin-info">
            <span className="sc-sidebar__admin-name">Administrator</span>
            <span className="sc-sidebar__admin-role">Super Admin</span>
          </div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="sc-main">
        {/* Top Bar */}
        <header className="sc-topbar">
          <div className="sc-topbar__left">
            <button className="sc-topbar__toggle" onClick={() => setSidebarOpen(p => !p)}>
              <Menu size={18}/>
            </button>
            <div className="sc-topbar__search">
              <Search size={14}/>
              <input
                type="text"
                placeholder="Search workers, categories…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="sc-topbar__right">
            <button className="sc-topbar__icon-btn" onClick={fetchDashboardData} title="Refresh">
              <RefreshCw size={16}/>
            </button>
            <div className="sc-topbar__badge-wrap">
              <button className="sc-topbar__icon-btn"><Bell size={16}/></button>
              {stats.pending > 0 && <span className="sc-topbar__badge">{stats.pending}</span>}
            </div>
            <div className="sc-topbar__user" onClick={handleLogout} title="Logout">
              <div className="sc-topbar__avatar">A</div>
              <div className="sc-topbar__user-info">
                <span className="sc-topbar__username">Admin</span>
                <span className="sc-topbar__user-role">Super Admin</span>
              </div>
              <ChevronDown size={13} className="sc-topbar__chevron"/>
            </div>
          </div>
        </header>

        {/* ══ PAGE BODY ══ */}
        <main className="sc-content">

          {/* ─── DASHBOARD ─── */}
          {activeTab === 'dashboard' && (
            <>
              <div className="sc-page-header">
                <div>
                  <h1 className="sc-page-header__title">Dashboard Overview</h1>
                  <p className="sc-page-header__sub">Welcome back, Administrator. Here's what's happening today.</p>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="sc-stats-grid">
                {[
                  { label: 'Total Workers',       value: stats.workers,    Icon: Users,       color: 'orange',    trend: 'Registered',   trendClass: 'trend-up', TrendIcon: TrendingUp },
                  { label: 'Total Hire Requests', value: stats.requests,   Icon: ClipboardList, color: 'emerald', trend: 'All time',    trendClass: 'trend-up', TrendIcon: TrendingUp },
                  { label: 'Pending Requests',    value: stats.pending,    Icon: Hourglass,   color: 'amber',   trend: 'Needs review', trendClass: 'trend-warn',TrendIcon: CircleDot },
                  { label: 'Active Categories',   value: stats.categories, Icon: Star,        color: 'violet',  trend: 'Skill areas',  trendClass: 'trend-up', TrendIcon: TrendingUp },
                ].map(({ label, value, Icon, color, trend, trendClass, TrendIcon }) => (
                  <div key={label} className={`sc-stat-card sc-stat-card--${color}`}>
                    <div className="sc-stat-card__icon"><Icon size={22}/></div>
                    <div className="sc-stat-card__body">
                      <span className="sc-stat-card__label">{label}</span>
                      <span className="sc-stat-card__value">{loading ? '—' : value}</span>
                      <span className={`sc-stat-card__trend ${trendClass}`}><TrendIcon size={12}/> {trend}</span>
                    </div>
                    <div className="sc-stat-card__bg-icon"><Icon size={80}/></div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="sc-card mt-4">
                <div className="sc-card__header">
                  <div className="sc-card__header-left">
                    <span className="sc-card__header-icon"><ClockArrowUp size={15}/></span>
                    <h2>Recent Hire Activity</h2>
                  </div>
                  <button className="sc-btn sc-btn--ghost" onClick={() => setActiveTab('requests')}>
                    View All <ArrowRight size={13}/>
                  </button>
                </div>
                <div className="sc-table-wrap">
                  {loading ? <div className="sc-loader-wrap"><div className="sc-loader"></div></div>
                   : recentRequests.length === 0 ? (
                    <div className="sc-empty">
                      <Inbox size={44} strokeWidth={1.2}/>
                      <p>No hiring activity yet</p>
                    </div>
                  ) : (
                    <table className="sc-table">
                      <thead>
                        <tr>
                          <th>#</th><th>Worker</th><th>Category</th><th>Subcategory</th>
                          <th>Hourly Pay</th><th>Date</th><th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentRequests.map((req, i) => (
                          <tr key={i}>
                            <td className="sc-table__num">{i + 1}</td>
                            <td>
                              <div className="sc-table__user">
                                <div className="sc-table__avatar">{req.worker?.firstName?.[0] || '?'}</div>
                                <div>
                                  <span className="sc-table__name">{req.worker?.firstName} {req.worker?.lastName}</span>
                                  <span className="sc-table__email">{req.worker?.email}</span>
                                </div>
                              </div>
                            </td>
                            <td><span className="sc-tag sc-tag--orange">{req.worker?.category || 'N/A'}</span></td>
                            <td>{req.worker?.subCategory || '—'}</td>
                            <td><span className="sc-pay">₹{req.worker?.hourlyPay || '—'}<small>/hr</small></span></td>
                            <td>{req.requestDate ? new Date(req.requestDate).toLocaleDateString('en-GB') : '—'}</td>
                            <td><span className={`sc-badge sc-badge--${statusColor(req.status)}`}>{cap(req.status)}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Category Breakdown */}
              {!loading && workers.length > 0 && (
                <div className="sc-card mt-4">
                  <div className="sc-card__header">
                    <div className="sc-card__header-left">
                      <span className="sc-card__header-icon"><PieChart size={15}/></span>
                      <h2>Workers by Category</h2>
                    </div>
                  </div>
                  <div className="sc-category-grid">
                    {Object.entries(categoryMap).map(([cat, count], i) => {
                      const color = colors[i % colors.length];
                      const pct = Math.round((count / workers.length) * 100);
                      return (
                        <div className="sc-cat-item" key={cat}>
                          <div className="sc-cat-item__header">
                            <span className={`sc-cat-item__dot sc-cat-item__dot--${color}`}></span>
                            <span className="sc-cat-item__name">{cat}</span>
                            <span className="sc-cat-item__count">{count}</span>
                          </div>
                          <div className="sc-progress">
                            <div className={`sc-progress__bar sc-progress__bar--${color}`} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ─── WORKERS ─── */}
          {activeTab === 'workers' && (
            <>
              <div className="sc-page-header">
                <div>
                  <h1 className="sc-page-header__title">Workers</h1>
                  <p className="sc-page-header__sub">{filteredWorkers.length} worker{filteredWorkers.length !== 1 ? 's' : ''} registered on the platform</p>
                </div>
              </div>
              <div className="sc-card">
                <div className="sc-card__header">
                  <div className="sc-card__header-left">
                    <span className="sc-card__header-icon"><HardHat size={15}/></span>
                    <h2>All Workers</h2>
                  </div>
                  <div className="sc-search-mini">
                    <Search size={13}/>
                    <input type="text" placeholder="Filter workers…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                  </div>
                </div>
                <div className="sc-table-wrap">
                  {loading ? <div className="sc-loader-wrap"><div className="sc-loader"></div></div>
                   : filteredWorkers.length === 0 ? (
                    <div className="sc-empty"><UserX size={44} strokeWidth={1.2}/><p>No workers found</p></div>
                  ) : (
                    <table className="sc-table">
                      <thead>
                        <tr>
                          <th>#</th><th>Worker</th><th>Category</th><th>Subcategory</th>
                          <th>City</th><th>Hourly Pay</th><th>Experience</th>
                          <th>Period</th><th>Phone</th><th>Requests</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredWorkers.map((w, i) => (
                          <tr key={w._id || i}>
                            <td className="sc-table__num">{i + 1}</td>
                            <td>
                              <div className="sc-table__user">
                                <div className="sc-table__avatar">{w.firstName?.[0] || '?'}</div>
                                <div>
                                  <span className="sc-table__name">{w.firstName} {w.lastName}</span>
                                  <span className="sc-table__email">{w.email}</span>
                                </div>
                              </div>
                            </td>
                            <td><span className="sc-tag sc-tag--orange">{w.category || '—'}</span></td>
                            <td>{w.subCategory || '—'}</td>
                            <td>{w.city || '—'}</td>
                            <td><span className="sc-pay">₹{w.hourlyPay || '—'}<small>/hr</small></span></td>
                            <td>{w.workExperience || '—'}</td>
                            <td>{w.desiredPeriod || '—'}</td>
                            <td>{w.phone || '—'}</td>
                            <td>
                              <div className="sc-req-summary">
                                <span className="sc-badge sc-badge--success">{(w.requests||[]).filter(r=>r.status==='accepted').length} ✓</span>
                                <span className="sc-badge sc-badge--warning">{(w.requests||[]).filter(r=>r.status==='pending').length} ⏳</span>
                                <span className="sc-badge sc-badge--danger">{(w.requests||[]).filter(r=>r.status==='rejected').length} ✗</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ─── REQUESTS ─── */}
          {activeTab === 'requests' && (
            <>
              <div className="sc-page-header">
                <div>
                  <h1 className="sc-page-header__title">Hire Requests</h1>
                  <p className="sc-page-header__sub">{stats.requests} total requests — {stats.pending} pending</p>
                </div>
              </div>
              <div className="sc-filter-chips">
                {['all','pending','accepted','rejected','completed'].map(f => (
                  <button key={f} className={`sc-chip ${statusFilter === f ? 'active' : ''}`} onClick={() => setStatusFilter(f)}>
                    {cap(f)}
                  </button>
                ))}
              </div>
              <div className="sc-card mt-3">
                <div className="sc-card__header">
                  <div className="sc-card__header-left">
                    <span className="sc-card__header-icon"><ClipboardList size={15}/></span>
                    <h2>All Hire Requests</h2>
                  </div>
                  <span className="sc-badge sc-badge--secondary">{filteredRequests.length} results</span>
                </div>
                <div className="sc-table-wrap">
                  {loading ? <div className="sc-loader-wrap"><div className="sc-loader"></div></div>
                   : filteredRequests.length === 0 ? (
                    <div className="sc-empty"><Inbox size={44} strokeWidth={1.2}/><p>No requests found</p></div>
                  ) : (
                    <table className="sc-table">
                      <thead>
                        <tr>
                          <th>#</th><th>Worker</th><th>Category</th><th>Subcategory</th>
                          <th>Hourly Pay</th><th>City</th><th>Date</th><th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((req, i) => (
                          <tr key={i}>
                            <td className="sc-table__num">{i + 1}</td>
                            <td>
                              <div className="sc-table__user">
                                <div className="sc-table__avatar">{req.worker?.firstName?.[0] || '?'}</div>
                                <div>
                                  <span className="sc-table__name">{req.worker?.firstName} {req.worker?.lastName}</span>
                                  <span className="sc-table__email">{req.worker?.email}</span>
                                </div>
                              </div>
                            </td>
                            <td><span className="sc-tag sc-tag--orange">{req.worker?.category || 'N/A'}</span></td>
                            <td>{req.worker?.subCategory || '—'}</td>
                            <td><span className="sc-pay">₹{req.worker?.hourlyPay || '—'}<small>/hr</small></span></td>
                            <td>{req.worker?.city || '—'}</td>
                            <td>{req.requestDate ? new Date(req.requestDate).toLocaleDateString('en-GB') : '—'}</td>
                            <td><span className={`sc-badge sc-badge--${statusColor(req.status)}`}>{cap(req.status)}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ─── USERS ─── */}
          {activeTab === 'users' && (
            <>
              <div className="sc-page-header">
                <div>
                  <h1 className="sc-page-header__title">Registered Users</h1>
                  <p className="sc-page-header__sub">Data of all registered customers on the platform</p>
                </div>
              </div>
              <div className="sc-card">
                <div className="sc-card__header">
                  <div className="sc-card__header-left">
                    <span className="sc-card__header-icon"><User size={15}/></span>
                    <h2>All Users</h2>
                  </div>
                  <div className="sc-search-mini">
                    <Search size={13}/>
                    <input type="text" placeholder="Search users…" />
                  </div>
                </div>
                <div className="sc-table-wrap">
                  {loading ? <div className="sc-loader-wrap"><div className="sc-loader"></div></div>
                   : filteredSystemUsers.length === 0 ? (
                    <div className="sc-empty"><UserX size={44} strokeWidth={1.2}/><p>No users found</p></div>
                  ) : (
                    <table className="sc-table">
                      <thead>
                        <tr>
                          <th>#</th><th>User</th><th>Contact</th><th>Address</th><th>Role</th><th>Acc. Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSystemUsers.map((u, i) => (
                          <tr key={u._id || i}>
                            <td className="sc-table__num">{i + 1}</td>
                            <td>
                              <div className="sc-table__user">
                                <div className="sc-table__avatar">{u.fullName?.[0] || '?'}</div>
                                <div>
                                  <span className="sc-table__name">{u.fullName}</span>
                                  <span className="sc-table__email">{u.email}</span>
                                </div>
                              </div>
                            </td>
                            <td>{u.phone || '—'}</td>
                            <td>{u.address || '—'}</td>
                            <td><span className={`sc-badge sc-badge--${u.role === 'admin' ? 'info' : 'secondary'}`}>{cap(u.role)}</span></td>
                            <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ─── COMPLAINTS ─── */}
        {activeTab === 'complaints' && (
          <>
          <div className="sc-page-header">
          <div>
          <h1 className="sc-page-header__title">Complaints</h1>
          <p className="sc-page-header__sub">
          Complaint tickets generated by customers or workers
          </p>
          </div>
          </div>
          
          <div className="sc-card">
          <div className="sc-card__header">
          <div className="sc-card__header-left">
          <span className="sc-card__header-icon">
          <AlertTriangle size={15} />
          </span>
          <h2>Active Tickets</h2>
          </div>
          </div>
          
          <div className="sc-table-wrap">
          {loading ? (
          <p style={{ padding: "20px" }}>Loading complaints...</p>
          ) : complaints.length === 0 ? (
          <div className="sc-empty">
          <Inbox size={44} strokeWidth={1.2} />
          <p>No complaints filed</p>
          </div>
          ) : (
          <table className="sc-table">
          <thead>
          <tr>
          <th>#</th>
          <th>Subject</th>
          <th>Description</th>
          <th>Action</th>
          </tr>
          </thead>
          
          <tbody>
          {complaints.map((item, index) => (
          <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.subject}</td>
          <td>{item.description}</td>
          <td>
            <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "red"
            }}
            >
            <Trash2 size={18} />
            </button>
 
          </td>
          </tr>
          ))}
          </tbody>
          </table>
           )}
          </div>
          </div>
          </>
          )}

          {/* ─── PAYMENTS ─── */}
          {activeTab === 'payments' && (
            <>
              <div className="sc-page-header">
                <div>
                  <h1 className="sc-page-header__title">Payments & Transactions</h1>
                  <p className="sc-page-header__sub">Financial overview and transaction history</p>
                </div>
              </div>
              <div className="sc-card">
                <div className="sc-card__header">
                  <div className="sc-card__header-left">
                    <span className="sc-card__header-icon"><CreditCard size={15}/></span>
                    <h2>Recent Transactions</h2>
                  </div>
                </div>
                <div className="sc-table-wrap">
                  <div className="sc-empty">
                    <Inbox size={44} strokeWidth={1.2}/>
                    <p>No transactions found</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ─── SETTINGS ─── */}
          {activeTab === 'settings' && (
            <>
              <div className="sc-page-header">
                <div>
                  <h1 className="sc-page-header__title">Platform Settings</h1>
                  <p className="sc-page-header__sub">Manage administrator preferences and application configs</p>
                </div>
              </div>
              <div className="sc-card" style={{ padding: '30px' }}>
                <div className="sc-empty">
                  <Settings size={44} strokeWidth={1.2}/>
                  <p>Settings panel coming soon</p>
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default Admin;