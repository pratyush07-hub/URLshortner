import React from 'react'
import { FaLink, FaChartLine, FaClock, FaUser } from 'react-icons/fa'
import Navbar from '../components/Navbar'

const Dashboardpage = () => {
  // Mock data - replace with actual data from your backend
  const stats = [
    { title: 'Total URLs', value: '1,234', icon: <FaLink className="text-blue-500" /> },
    { title: 'Clicks Today', value: '567', icon: <FaChartLine className="text-green-500" /> },
    { title: 'Active Links', value: '890', icon: <FaClock className="text-yellow-500" /> },
  ]

  const recentUrls = [
    { id: 1, originalUrl: 'https://example.com/very-long-url', shortUrl: 'short.ly/abc123', clicks: 45, createdAt: '2024-03-20' },
    { id: 2, originalUrl: 'https://another-example.com/long-url', shortUrl: 'short.ly/def456', clicks: 23, createdAt: '2024-03-19' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your URL shortening overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent URLs Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Recent URLs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUrls.map((url) => (
                  <tr key={url.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs truncate">{url.originalUrl}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{url.clicks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{url.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboardpage