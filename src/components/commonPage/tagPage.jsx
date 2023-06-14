import React from 'react';
import { useParams } from 'react-router-dom';
import CommonPage from '@components/commonPage/commonPage';

function TagPage() {
  const { tag } = useParams();
  return (
    <CommonPage
      paramName={tag}
      callbackName={'getTagsContentsAsync'}
    />
  );
}

export default TagPage;