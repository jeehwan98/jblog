export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center mr-10">
      <input
        aria-label="Search"
        type="text"
        placeholder="검색어 입력"
        className="border rounded-full p-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}