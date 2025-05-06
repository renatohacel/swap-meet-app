import { Sidebar } from "./Sidebar/Sidebar";

const Home = () => {
  return (
    <main className="min-h-screen bg-primary/20">
      <Sidebar />
      <div className="py-32 px-12 lg:ml-64">
        <div className="bg-white rounded-lg  p-8">
          <h1>main content</h1>
        </div>
      </div>
    </main>
  );
};

export default Home;
