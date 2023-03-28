import React from 'react';
interface IProps {
  trait_type: string;
  value: string;
}
import './index.scss';

export const AttributeCard: React.FC<IProps> = ({ trait_type, value }) => {
  return (
    <div className='attribute'>
      <div className='attribute_title'>{trait_type}</div>
      <div className='attribute_value'>{value}</div>
    </div>
  );
};
