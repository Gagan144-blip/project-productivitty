import Image from "next/image";

export default function Home() {
  return (

    <div className="p-6 bg-gray-500 text-white rounded-xl shadow transition transform hover:scale-105 align-middle ml-17 mt-6 mr-6">

      {/*header section*/}
      <h1 className="text-3xl text-gray-500 text-center font-bold mb-6">Welcome to Productivity Dashboard</h1>
      <p className="text-gray-400 mb-6">Here's your productivity Summary</p>

      {/*Stats Cards*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        <div className="p-5 bg-gray-800 rounded-xl hover:bg-gray-500 transition">
          <h2 className="text-xl text-white font-extrabold">Tasks Today</h2>
          <p className="text-3xl text-white font-bold mt-2">3</p>
        </div>

        <div className="p-5 bg-gray-800 rounded-xl hover:bg-gray-500 transition">
          <h2 className="text-xl text-white font-extrabold">Completed</h2>
          <p className="text-3xl text-white font-bold mt-2">12</p>
        </div>

        <div className="p-5 bg-gray-800 rounded-xl hover:bg-gray-500 transition">
          <h2 className="text-xl text-white font-extrabold">Active Projects</h2>
          <p className="text-3xl text-white font-bold mt-2">2</p>
        </div>
</div>

        {/*Quick Actions*/}
        <h2 className="text-2xl font-bold mb-3">Quick Actions</h2>
        <div className="flex gap-4 mb-10">

          <button className="px-5 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"> + Add Task
          </button>
          <button className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
            + Add Note</button>
            <button className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700">
              + Add Project
            </button>
        </div>
        

        {/*Recent Activity */}

        <h2 className="text-2xl font-bold mb-3">Recent Activity</h2>
        <div className="bg-gray-800 p-5 rounded-xl">
          <ul className="space-y-3">
          <li className="border-b border-gray-700 pb-2">⭐ Completed task: UI Fixes</li>
          <li className="border-b border-gray-700 pb-2">📝 Added Note: Project Ideas</li>
          <li>📌 New Task: Dashboard Design</li>
          </ul>
        </div>
          
          
          </div>

  );
}