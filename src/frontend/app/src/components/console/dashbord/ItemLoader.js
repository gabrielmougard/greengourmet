import React from "react"
import ContentLoader from "react-content-loader" 

const ItemLoader = () => (
  <ContentLoader 
    speed={0.5}
    width={400}
    height={130}
    viewBox="0 0 400 130"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="35" y="3" rx="3" ry="3" width="67" height="11" /> 
    <rect x="116" y="3" rx="3" ry="3" width="140" height="11" /> 
    <rect x="153" y="48" rx="3" ry="3" width="53" height="11" /> 
    <rect x="222" y="48" rx="3" ry="3" width="72" height="11" /> 
    <rect x="35" y="48" rx="3" ry="3" width="100" height="11" /> 
    <rect x="35" y="25" rx="3" ry="3" width="140" height="11" /> 
    <rect x="185" y="25" rx="3" ry="3" width="173" height="11" />
  </ContentLoader>
)

export default ItemLoader