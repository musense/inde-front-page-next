import React from 'react';
import { useParams } from 'react-router-dom';
import CommonPage from '@components/CommonPage/commonPage';

function Category() {
  const { categoryName } = useParams();
  return (
    <CommonPage
      paramName={categoryName}
      callbackName={'getTitleContentsByCategoryAsync'}
    />
  );
}

export default Category;