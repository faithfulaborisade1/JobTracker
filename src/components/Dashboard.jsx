import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { JOB_STATUS_OPTIONS } from '../types/database'
import JobForm from './JobForm'

export default function Dashboard({ user }) {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredJobs(jobs)
    } else {
      setFilteredJobs(jobs.filter(job => job.status === statusFilter))
    }
  }, [statusFilter, jobs])

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchJobs()
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const getStatusBadgeColor = (status) => {
    const colors = {
      saved: 'bg-gray-100 text-gray-800',
      applied: 'bg-blue-100 text-blue-800',
      interviewing: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      offer: 'bg-green-100 text-green-800'
    }
    return colors[status] || colors.saved
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
            <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSignOut}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingJob ? 'Edit Job' : 'Quick Add Job'}
            </h2>
            {editingJob && (
              <button
                onClick={() => setEditingJob(null)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel Edit
              </button>
            )}
          </div>
          <JobForm
            job={editingJob}
            onSuccess={() => {
              setEditingJob(null)
              fetchJobs()
            }}
            onCancel={editingJob ? () => setEditingJob(null) : null}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by status
          </label>
          <select
            id="filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All ({jobs.length})</option>
            {JOB_STATUS_OPTIONS.map((option) => {
              const count = jobs.filter(job => job.status === option.value).length
              return (
                <option key={option.value} value={option.value}>
                  {option.label} ({count})
                </option>
              )
            })}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No jobs found. Add your first job application!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {job.title}
                          </a>
                        ) : (
                          job.title
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.date_applied ? new Date(job.date_applied).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingJob(job)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} applications
        </div>
      </div>
    </div>
  )
}
