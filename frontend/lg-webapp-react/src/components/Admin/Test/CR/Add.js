

import React, { useState } from 'react';

const Add = () => {
  const [showDataPost, setShowDataPost] = useState(false);

  const handleAddClick = () => {
    setShowDataPost(true);
  };

  return (
    <div>
      <button onClick={handleAddClick}>Add</button>
      {/*{showDataPost && <DataPostComponent />}*/}
    </div>
  );
};
