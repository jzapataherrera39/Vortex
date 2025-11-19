import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PoolForm from '../components/PoolForm';

const EditPoolPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poolData, setPoolData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPool = async () => {
      // In a real application, you would fetch pool data by ID from an API
      // const response = await poolService.getPoolById(id);
      // setPoolData(response.data);
      
      // Mock data for demonstration
      const mockPools = [
        { id: 1, name: 'Pool Alpha', location: 'Zone 1', status: 'Active' },
        { id: 2, name: 'Pool Beta', location: 'Zone 2', status: 'Inactive' },
        { id: 3, name: 'Pool Gamma', location: 'Zone 1', status: 'Active' },
      ];
      const foundPool = mockPools.find(pool => pool.id === parseInt(id));
      setPoolData(foundPool);
      setLoading(false);
    };
    fetchPool();
  }, [id]);

  const handleUpdatePool = (updatedData) => {
    console.log(`Updating pool ${id} with:`, updatedData);
    alert('Pool update functionality to be implemented.');
    navigate('/pools');
    // In a real application, you would call poolService.updatePool(id, updatedData);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  if (!poolData) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Pool not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit Pool
          </h2>
        </div>
        <PoolForm initialData={poolData} onSubmit={handleUpdatePool} isEditMode={true} />
      </div>
    </div>
  );
};

export default EditPoolPage;