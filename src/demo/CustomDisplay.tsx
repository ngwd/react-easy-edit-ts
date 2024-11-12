import React from 'react';

interface Props {
  value?: string; // value is optional and of type string
}

const props: React.FC<Props> = ({ value }) => {
  const val = value || 'redlohecalp motsuC';
  return (
    <div>
      {val.split('').reverse().join('')}
    </div>
  );
};

export default props;
