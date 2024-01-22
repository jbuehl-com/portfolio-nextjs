import React from 'react'
import './ref-laptop-mobile.sass'
// import { GatsbyImage, getImage } from 'gatsby-plugin-image'


class RefLaptopMobile extends React.Component {
  
  render() {

    return (
      <div className="visual portfolio">
        {/* <div className='dev-laptop'>
          <div className="device">
            <GatsbyImage
              image={imageDevice01}
              alt={"data.mdx.frontmatter.image01_alt"}
            />
          </div>
          <div className='screen'>
            <GatsbyImage
              image={image01}
              alt={"data.mdx.frontmatter.image01_alt"}
            />
          </div>
        </div>
        <div className='dev-mobile'>
          <div className="device">
            <GatsbyImage
              image={imageDevice02}
              alt={"data.mdx.frontmatter.image01_alt"}
            />
          </div>
          <div className='screen'>
            <GatsbyImage
              image={image02}
              alt={"data.mdx.frontmatter.image02_alt"}
            />
          </div>
        </div> */}
        {this.props.children}
      </div>

    )
  }
}

export default RefLaptopMobile
