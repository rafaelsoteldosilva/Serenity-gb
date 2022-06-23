// "type": "video",
// "version": "1.0",
// "provider_name": "Vimeo",
// "provider_url": "https://vimeo.com/",
// "title": "My video",
// "author_name": "Sara Author",
// "author_url": "https://vimeo.com/techuser",
// "is_plus": "0",
// "account_type": "live_business",
// "html": "<iframe src=\"https://player.vimeo.com/video/286898202?h=fd61acd044\" width=\"480\" height=\"360\" frameborder=\"0\" title=\"My video\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>",
// "width": 480,
// "height": 360,
// "duration": 23,
// "description": "This is my video.",
// "thumbnail_url": "https://i.vimeocdn.com/video/721904228_295x166",
// "thumbnail_width": 295,
// "thumbnail_height": 221,
// "thumbnail_url_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F721904228_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png",
// "upload_date": "2020-10-20 10:00:00",
// "video_id": 286898202,
// "uri": "/videos/286898202"

const fetch = require("node-fetch");

const NODE_TYPE = "Works";

const videosToShow = [
   {
      url: "https://vimeo.com/675717426",
   },
   {
      url: "https://vimeo.com/675385832",
   },
   {
      url: "https://vimeo.com/645719996",
   },
   {
      url: "https://vimeo.com/664240420",
   },
   {
      url: "https://vimeo.com/663941637",
   },
   {
      url: "https://vimeo.com/645719996",
   },
   {
      url: "https://vimeo.com/664240420",
   },
   {
      url: "https://vimeo.com/663941637",
   },
   {
      url: "https://vimeo.com/645719996",
   },
   {
      url: "https://vimeo.com/664240420",
   },
   {
      url: "https://vimeo.com/663941637",
   },
   {
      url: "https://vimeo.com/645719996",
   },
   {
      url: "https://vimeo.com/664240420",
   },
   {
      url: "https://vimeo.com/663941637",
   },
   {
      url: "https://vimeo.com/645719996",
   },
   {
      url: "https://vimeo.com/664240420",
   },
   {
      url: "https://vimeo.com/663941637",
   },
   {
      url: "https://vimeo.com/645719996",
   },
];

exports.sourceNodes = async ({
   actions,
   createNodeId,
   createContentDigest,
}) => {
   const { createNode } = actions;

   const allWorks = await Promise.all(
      videosToShow.map(async (video) => {
         const videoData = await fetch(
            `https://vimeo.com/api/oembed.json?url=${video.url}`
         );
         return await videoData.json();
      })
   );

   allWorks.forEach((video, ndx) => {
      createNode({
         ...video,
         id: createNodeId(ndx),
         parent: null,
         children: [],
         internal: {
            type: NODE_TYPE,
            content: JSON.stringify(video),
            contentDigest: createContentDigest(video),
         },
      });
   });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
   actions.setWebpackConfig({
      module: {
         rules: [
            {
               test: /@react-three\/fiber/,
               use: loaders.null(),
            },
         ],
      },
   });
};
