export function PlagiarismMockup() {
  const students = [
    { id: 1, name: "Student A", plagiarism: 0, ai: 2, status: "original", grade: "A" },
    { id: 2, name: "Student B", plagiarism: 0, ai: 68, status: "ai", grade: "C" },
    { id: 3, name: "Student C", plagiarism: 92, ai: 8, status: "plagiarism", grade: "F" },
    { id: 4, name: "Student D", plagiarism: 5, ai: 3, status: "original", grade: "A" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white text-xl">Academic Integrity Report</h3>
            <p className="text-green-100 text-sm">English 101 - Essay Assignment</p>
          </div>
          <div className="text-right">
            <div className="text-white text-2xl">45</div>
            <div className="text-green-100 text-xs">Students</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-200">
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="text-3xl text-green-700 mb-1">32</div>
          <div className="text-sm text-green-700">Original</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <div className="text-3xl text-yellow-700 mb-1">8</div>
          <div className="text-sm text-yellow-700">AI Detected</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200">
          <div className="text-3xl text-red-700 mb-1">5</div>
          <div className="text-sm text-red-700">Plagiarized</div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-sm text-gray-600 mb-4">Student Analysis Results</div>
        
        <div className="space-y-3">
          {students.map((student) => (
            <div 
              key={student.id} 
              className={`p-4 rounded-xl border-2 ${
                student.status === 'original' ? 'bg-green-50 border-green-200' :
                student.status === 'ai' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    student.status === 'original' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                    student.status === 'ai' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    'bg-gradient-to-br from-red-500 to-pink-500'
                  }`}>
                    {student.id}
                  </div>
                  <div>
                    <div className="text-gray-900">{student.name} - Essay #1</div>
                    <div className="text-xs text-gray-600">Submitted 2 days ago</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  student.status === 'original' ? 'bg-green-200 text-green-800' :
                  student.status === 'ai' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  Grade: {student.grade}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Plagiarism</span>
                    <span className={student.plagiarism > 50 ? 'text-red-700' : 'text-green-700'}>
                      {student.plagiarism}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        student.plagiarism > 50 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(student.plagiarism, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">AI Detection</span>
                    <span className={student.ai > 50 ? 'text-yellow-700' : 'text-green-700'}>
                      {student.ai}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        student.ai > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${student.ai}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {student.status === 'plagiarism' && (
                <div className="mt-3 text-xs bg-white rounded-lg p-3 border border-red-200 text-gray-700">
                  <strong className="text-red-700">Source Match:</strong> Wikipedia - "Climate Change Effects" (92% similarity)
                </div>
              )}
              {student.status === 'ai' && (
                <div className="mt-3 text-xs bg-white rounded-lg p-3 border border-yellow-200 text-gray-700">
                  High probability of AI assistance detected. ChatGPT patterns identified.
                </div>
              )}
              {student.status === 'original' && (
                <div className="mt-3 text-xs bg-white rounded-lg p-3 border border-green-200 text-gray-700">
                  ✓ Original work detected. No integrity concerns found.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
