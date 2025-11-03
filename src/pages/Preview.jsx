import React, { useState } from 'react';
import { X, Plus, MessageSquare, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ import this

export default function RefactorResultsPage() {
  const navigate = useNavigate(); // ✅ initialize navigate
  const [showModal, setShowModal] = useState(true);

  // ✅ Temporary storage (in real app you'd save to backend)
  const [savedResults, setSavedResults] = useState([]);

  const originalCode = `data = request.get_json()

    # Process the data
    result = process_input(data['input'])

    return jsonify({
        'status': 'success',
        'result': result
    })`;

  const refactoredCode = `data = request.get_json()
    if not data or 'input' not in data:
        raise BadRequest("Missing required 'input' field")

    # Process the data
    result = process_input(data['input'])

    return jsonify({
        'status': 'success',
        'result': result
    }), 200

except BadRequest as e:
    logger.warning(f"Bad request: {str(e)}")
    return jsonify({`;

  // ✅ Save changes handler
  const handleAcceptAndSave = () => {
    const newEntry = {
      timestamp: new Date().toLocaleString(),
      original: originalCode,
      refactored: refactoredCode,
    };

    setSavedResults((prev) => [...prev, newEntry]); // save to array
    console.log("Saved Results:", [...savedResults, newEntry]); // just to verify
    navigate("/chat-box"); // go back
  };

  // ✅ Cancel handler
  const handleCancel = () => {
    navigate("/chat-box"); // just go back
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#121212] border-b border-[#212121] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#343A40] rounded-full flex items-center justify-center flex-shrink-0">
                AI
              </div>
              <p className="text-gray-300 text-sm">
                I'll help you improve the exception handling in app.py. Here's the refactored code with comprehensive error handling.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-[#121212] rounded-lg w-full max-w-5xl mx-4 border border-[#343A40]">
              <div className="border-b border-[#343A40] p-6">
                <h2 className="text-2xl font-bold">Refactor Results</h2>
              </div>

              {/* Modal Content */}
              <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-gray-300">Original Code</h3>
                  <div className="bg-black rounded-lg p-4 border border-[#343A40] h-80 overflow-auto">
                    <pre className="text-sm text-gray-300 font-mono">
                      <code>{originalCode}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-gray-300">Refactored Code</h3>
                  <div className="bg-black rounded-lg p-4 border border-[#343A40] h-80 overflow-auto">
                    <pre className="text-sm text-gray-300 font-mono">
                      <code>{refactoredCode}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-[#343A40] p-6 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-lg bg-[#343A40] hover:bg-[#404040] transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={handleAcceptAndSave}
                  className="px-6 py-2 rounded-lg bg-[#FFA500] hover:bg-[#FFC285] transition-colors font-medium text-black"
                >
                  Accept and Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Input */}
        <div className="mt-auto bg-[#121212] border-t border-[#212121] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#212121] rounded-lg flex items-center px-4 py-3 border border-[#343A40]">
              <input
                type="text"
                placeholder="Enter Your Prompt"
                className="flex-1 bg-transparent outline-none text-gray-300 placeholder-gray-500"
              />
              <button className="ml-4 px-6 py-2 rounded-lg bg-[#FFA500] hover:bg-[#FFC285] transition-colors font-medium text-black">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
