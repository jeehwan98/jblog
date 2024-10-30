export const EditorWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-1/2 flex flex-col justify-between h-full shadow-lg bg-white">{children}</div>;
}

export const PublishButton = () => {
  return <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">출간하기</button>;
}

export const ContextArea = ({ children }: { children: React.ReactNode }) => {
  return <div className='p-10'>{children}</div>;
}

export const FooterBar = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between items-center p-3 shadow-md border-t border-gray-200 bg-white">{children}</div>;
}

export const SaveDraftButton = () => {
  return <button type="submit" className="px-4 py-2 mr-2 rounded hover:bg-gray-100">임시저장</button>;
}

export const TagWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center mb-4 flex-wrap">{children}</div>
}