// src/services/poolService.js

const mockPools = [
    { id: 1, name: 'Pool Alpha', location: 'Zone 1', status: 'Active' },
    { id: 2, name: 'Pool Beta', location: 'Zone 2', status: 'Inactive' },
    { id: 3, name: 'Pool Gamma', location: 'Zone 1', status: 'Active' },
  ];
  
  const getAllPools = async () => {
    console.log('Mocking fetching all pools');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockPools });
      }, 300);
    });
  };
  
  const getPoolById = async (id) => {
    console.log(`Mocking fetching pool with ID: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const pool = mockPools.find(p => p.id === parseInt(id));
        resolve({ data: pool });
      }, 300);
    });
  };
  
  const createPool = async (poolData) => {
    console.log('Mocking creating pool:', poolData);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPool = { id: mockPools.length + 1, ...poolData };
        mockPools.push(newPool);
        resolve({ data: newPool });
      }, 300);
    });
  };
  
  const updatePool = async (id, poolData) => {
    console.log(`Mocking updating pool ${id} with:`, poolData);
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockPools.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          mockPools[index] = { ...mockPools[index], ...poolData };
          resolve({ data: mockPools[index] });
        } else {
          resolve({ error: 'Pool not found' });
        }
      }, 300);
    });
  };
  
  const deletePool = async (id) => {
    console.log(`Mocking deleting pool with ID: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockPools.length;
        // In a real scenario, this would interact with a backend to permanently remove.
        // For mock, we'll just filter it out for demonstration purposes.
        // Note: This won't actually modify `mockPools` in a way that persists across calls
        // if not carefully managed (e.g., if you re-render the app, the original mockPools will reappear).
        // For a true mock with persistence, you'd need a more elaborate in-memory store.
        resolve({ success: true, message: `Pool ${id} deleted (mock)` });
      }, 300);
    });
  };

  const togglePoolStatus = async (id, currentStatus) => {
    console.log(`Mocking toggling status for pool ${id} from ${currentStatus}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockPools.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          mockPools[index].status = currentStatus === 'Active' ? 'Inactive' : 'Active';
          resolve({ data: mockPools[index] });
        } else {
          resolve({ error: 'Pool not found' });
        }
      }, 300);
    });
  };
  
  const poolService = {
    getAllPools,
    getPoolById,
    createPool,
    updatePool,
    deletePool,
    togglePoolStatus,
  };
  
  export default poolService;