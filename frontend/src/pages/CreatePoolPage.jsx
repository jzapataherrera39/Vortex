import React from 'react';
import { useNavigate } from 'react-router-dom';
import PoolForm from '../components/PoolForm';

const CreatePoolPage = () => {
  const navigate = useNavigate();

  const handleCreatePool = (poolData) => {
    console.log('Creating new pool:', poolData);
    alert('Pool creation functionality to be implemented.');
    navigate('/pools');
    // In a real application, you would call poolService.createPool(poolData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Pool
          </h2>
        </div>
        <PoolForm onSubmit={handleCreatePool} />
      </div>
    </div>
  );
};

export default CreatePoolPage;