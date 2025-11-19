// src/services/userService.js

const mockUsers = [
    { id: 101, username: 'john.doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 102, username: 'jane.smith', email: 'jane.smith@example.com', role: 'User', status: 'Active' },
    { id: 103, username: 'peter.jones', email: 'peter.jones@example.com', role: 'User', status: 'Inactive' },
  ];
  
  const getAllUsers = async () => {
    console.log('Mocking fetching all users');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockUsers });
      }, 300);
    });
  };
  
  const getUserById = async (id) => {
    console.log(`Mocking fetching user with ID: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === parseInt(id));
        resolve({ data: user });
      }, 300);
    });
  };
  
  const createUser = async (userData) => {
    console.log('Mocking creating user:', userData);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: mockUsers.length + 101, ...userData };
        mockUsers.push(newUser);
        resolve({ data: newUser });
      }, 300);
    });
  };
  
  const updateUser = async (id, userData) => {
    console.log(`Mocking updating user ${id} with:`, userData);
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
          mockUsers[index] = { ...mockUsers[index], ...userData };
          resolve({ data: mockUsers[index] });
        } else {
          resolve({ error: 'User not found' });
        }
      }, 300);
    });
  };
  
  const deleteUser = async (id) => {
    console.log(`Mocking deleting user with ID: ${id}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockUsers.length;
        // In a real scenario, this would interact with a backend to permanently remove.
        // For mock, we'll just filter it out for demonstration purposes.
        resolve({ success: true, message: `User ${id} deleted (mock)` });
      }, 300);
    });
  };

  const toggleUserStatus = async (id, currentStatus) => {
    console.log(`Mocking toggling status for user ${id} from ${currentStatus}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
          mockUsers[index].status = currentStatus === 'Active' ? 'Inactive' : 'Active';
          resolve({ data: mockUsers[index] });
        } else {
          resolve({ error: 'User not found' });
        }
      }, 300);
    });
  };
  
  const userService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  };
  
  export default userService;