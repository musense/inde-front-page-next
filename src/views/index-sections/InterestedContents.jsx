import React, { useEffect, useState } from 'react'
import styles from './interestedContents.module.css';
import ContentPageConnect from './ContentPageConnect';
import { useAppContext } from '@store/context';

export default function InterestedContents({ interestedContents }) {
  const { state } = useAppContext();

  const clientWidth = state.clientWidth
  const [viewInterestedContents, setViewInterestedContents] = useState(null);
  // console.log("🚀 ~ file: InterestedContents.jsx:9 ~ InterestedContents ~ viewInterestedContents:", viewInterestedContents)

  useEffect(() => {

    if (interestedContents && interestedContents.length > 0) {
      // console.log("🚀 ~ file ContentPage.jsx:129 ~ useEffect ~ interestedContents:", interestedContents)
      if (clientWidth > 768) {
        setViewInterestedContents(interestedContents.slice(0, 3))
      } else {
        setViewInterestedContents(interestedContents)
      }
    }

  }, [interestedContents, clientWidth]);

  function onInterestedBtnClick(e) {
    e.preventDefault()

    const start = interestedContents.findIndex(c => c._id == viewInterestedContents[0]._id) + parseInt(e.target.value),
      end = interestedContents.findIndex(c => c._id == viewInterestedContents[0]._id) + 3 + parseInt(e.target.value);

    // console.log("🚀 ~ file ContentPage.jsx:94 ~ onInterestedBtnClick ~ start:", start)
    // console.log("🚀 ~ file ContentPage.jsx:94 ~ onInterestedBtnClick ~ end:", end)
    setViewInterestedContents(interestedContents.slice(start, end))
  }

  return viewInterestedContents && viewInterestedContents.length > 0 && <div className={styles['connect-flex-site']}>
    <div className='title'>Interested</div>
    <div>
      {clientWidth > 768 && (<div>
        {interestedContents.findIndex(c => c._id === viewInterestedContents[0]._id) !== 0 &&
          <button className={styles['prev']} value="-1" onClick={e => onInterestedBtnClick(e)} />
        }
      </div>)}
      <div className={styles['connect-flex-box-wrapper']}>
        <ContentPageConnect
          contents={viewInterestedContents} />
      </div>
      {clientWidth > 768 && (<div>
        {
          interestedContents.findIndex(c => c._id === viewInterestedContents[viewInterestedContents.length - 1]._id) !== interestedContents.length - 1 &&
          <button className={styles['next']} value="1" onClick={e => onInterestedBtnClick(e)} />
        }
      </div>)}
    </div>
  </div>;
}
