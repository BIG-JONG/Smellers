import React from 'react';
import PostForm from './components/PostForm'; // PostForm 파일의 실제 경로에 맞게 수정하세요.

function App() { // 또는 Page()
  return (
    <div className="App p-8"> {/* Tailwind CSS가 적용되도록 적절한 컨테이너 추가 */}
      <h1>향수 기록 작성</h1>
      <PostForm />
    </div>
  );
}

export default App;