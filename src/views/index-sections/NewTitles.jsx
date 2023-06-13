import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HotContent from "./HotContent";
import NewsContent from "./NewsContent";

import styles from './newTitle.module.css'
import TitleImage from "./TitleImage";





function NewTitles({ contents }) {
  console.log(`TITLE_CONTENTS: ${TITLE_CONTENTS}`)

  const [newContents, setNewContents] = useState(null);
  const [hotContents, setHotContents] = useState(null);

  const navigate = useNavigate()
  const mounted = useRef();
  const sortByAndReturn = (arr = [], key = null) => {
    console.log(arr);

    if (key === null) return arr
    if (key && typeof key === 'string' && key.toLowerCase().indexOf('date') !== -1) {
      return [...arr].sort((a1, a2) => new Date(a2[key]) - new Date(a1[key]))
    }
    return [...arr].sort((a1, a2) => a2[key] - a1[key])
  }

  useEffect(() => {
    // console.group('NewTitle');
    console.log(contents);
    // console.groupEnd('NewTitle');
    if (!mounted.current) {
      mounted.current = true;
      setNewContents(sortByAndReturn(contents, 'updatedAt'))
      setHotContents(sortByAndReturn(contents, 'thumbUp'))


    } else {

    }
  }, [mounted]);

  return (
    newContents && hotContents
      ? (<>
        <div className={`${styles['section-basic']}`}>

          <div className={`${styles['news-titles']} ${styles['content-container']}`}>
            <TitleImage type="news" title={'ニュース'} />
            <div className={`${styles['content-section']}`}>
              {
                newContents.map((content, index) => {
                  if (index >= 4) return
                  return (
                    <NewsContent
                      key={index}
                      index={index}
                      content={content} />
                  )
                })
              }
            </div>
          </div>

          <div className={`${styles['hot-titles']} ${styles['content-container']}`}>
            <TitleImage type="hot" title={'ホット'} />
            <div className={`${styles['content-section']}`}>
              {
                newContents.map((content, index) => {
                  if (index >= 5) return

                  return (
                    <HotContent
                      key={index}
                      index={index}
                      content={content} />
                  )
                })
              }
            </div>
          </div>

        </div>
      </>)
      : null
  );
}

export default NewTitles;
