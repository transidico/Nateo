/*Componente Navbar*/
function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-10xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🌍 Nateo Travel</h1>
        <div className="space-x-6">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Destinations</a>
          <a href="#" className="hover:text-blue-600">Tips</a>
          <a href="#" className="hover:text-blue-600">About</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar