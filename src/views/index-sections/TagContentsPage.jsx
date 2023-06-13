// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import IndexDecorationImage from "components/IndexDecorationImage/IndexDecorationImage";
// import { useOutletContext } from 'react-router-dom';
// import { getTitleContentsByTag } from 'assets/js/titleContents';
// import styles from './tagContentPage.module.css';
// import ContentPageRight from './ContentPageRight';
// import ConnectContent from 'components/ConnectContent/ConnectContent';


// const item0 = {
//   src: require('assets/img/bg1.png'),
//   altText: 'Nature, United States',
// };
// const item1 = {
//   src: require('assets/img/news_image.png'),
//   altText: 'Nature, United States',
// };

// function TagContentsPage() {

//   const { tags } = useOutletContext();

//   const [titleContents, setTitleContents] = useState(null);


//   const { tagName } = useParams();

//   useEffect(() => {
//     getTitleContentsByTag(tagName)
//       .then(({res}) => {
//         console.log("🚀 ~ file TagContentsPage.js:40 ~ .then ~ titleContents:", titleContents)
//         const { data } = res
//         setTitleContents(data);
//       });
//   }, [tagName]);



//   return (
//     <>
//       <div className={`section ${styles.section}`} >
//       </div>
//       <IndexDecorationImage imageType={'cut'} />
//       <div className={styles['content-page']}>
//         <div className={styles['left-content']}>
//           <div className={`${styles['main-content']} ${styles['connect-connect']}`}>
//             <h2>#&nbsp;&nbsp;{tagName}</h2>
//             {titleContents ? (
//               <div className={`${styles['content-section']}`}>
//                 {titleContents.map((content, index) =>
//                   <ConnectContent key={index} index={index} content={content} />
//                 )}
//               </div>
//             ) : <div className={`${styles['content-section']} ${styles.empty}`}>Empty...</div>
//             }
//           </div>
//         </div>
//         {tags && <ContentPageRight tags={tags} />}
//       </div>
//     </>
//   );
// }

// export default TagContentsPage;
