const testApi = async () => {
  try {
    const response = await fetch('http://localhost:000/api/v1/workers/getWorkers');
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data keys:', Object.keys(data));
    if (data.data) {
        console.log('Data.data keys:', Object.keys(data.data));
        if (data.data.worker) {
            console.log('Worker count:', data.data.worker.length);
            if (data.data.worker.length > 0) {
                console.log('First worker:', data.data.worker[0]);
            }
        } else {
            console.log('No worker key in data.data');
        }
    } else {
        console.log('No data key in response data');
        console.log('Full response data:', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testApi();
