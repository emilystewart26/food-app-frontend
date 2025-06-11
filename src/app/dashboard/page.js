import ReviewCard from '../globalComponents/ReviewCard';

export default function ViewDashboard() {
  return (
    <div className="min-h-screen bg-blue-100 py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Other dashboard content here... */}

    
       

      {/* User Reviews */}
      <ReviewCard />
      
    </div>
  );
}
