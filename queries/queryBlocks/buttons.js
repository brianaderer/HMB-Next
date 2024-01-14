import {default as button} from './button';

export default `      
        anchor
        apiVersion
        name
        cssClassNames
        innerBlocks {
          isDynamic
          name
          renderedHtml
          ... on CoreButton {
            ${button}
          }
        }
        clientId
        attributes {
          align
          anchor
          className
          cssClassName
          fontFamily
          fontSize
          layout
          lock
          style
        }`