import { gql } from '@apollo/client';
import * as queries from '../queries/queryBlocks/index';
import {Link} from 'next';
import {Button} from '../components';

export default function CoreButton(props) {
    const {attributes, renderedHtml, href} = props;
    const {url} = attributes;

    return (
        <Button.LinkButton type={'link'} url={href ? href : '#'} className={`btn-sm md:btn-md group-[.stickyContainer]:btn-sm`} >
            {renderedHtml}
        </Button.LinkButton>
    );
}

CoreButton.fragments = {
    entry: gql`
    fragment CoreButtonFragment on CoreButton  {
            ${queries.button}
          }
  `,
    key: `CoreButtonFragment`,
};

CoreButton.displayName = 'CoreButton';