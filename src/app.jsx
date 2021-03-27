import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import VideoList from "./components/video_list/video_list";
import SearchHeader from "./components/search_header/search_header";
import VideoDetail from "./video_detail/video_detail";

function App({ youtube }) {
  // 1. video 의 목록을 가진 UseState API 사용
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  const search = (query) => {
    setSelectedVideo(null);
    youtube
      .search(query) //
      .then((videos) => setVideos(videos));
  };

  // 마운트가 되었거나 업데이트가 될 때 쓸 수있는 / 원하는 함수를 등록하면 컴포넌트가 마운트 되었거나 업데이트 될 때마다 호출
  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
  );
}

// 컴포넌트가 마운트 되면 유행하는 videos를 받아와서 비동기적으로 setVideos라는 API를 이용해서 컴포넌트 데이터를 업데이트
// 업데이트가 되면 videos를 video_list란 컴포넌트에 전달
export default App;
