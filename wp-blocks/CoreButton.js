import { gql } from '@apollo/client';
import * as queries from '../queries/queryBlocks/index';
import {Link} from 'next';
import {Button} from '../components';

export default function CoreButton(props) {
    const {attributes, customAttributes} = props;
    const {anchor, url, type, text} = attributes;

    return (
        <Button.LinkButton type={'link'} url={url} className={`btn-sm md:btn-md group-[.stickyContainer]:btn-sm`} >
            {text}
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