import { gql } from '@apollo/client';
import * as queries from '../queries/queryBlocks/index';
import {Button} from '../components';

export default function CoreButton(props) {
    const {attributes, customAttributes} = props;
    const {anchor, url, type, text} = attributes;

    return (
        <Button.LinkButton type={'link'} url={url} >
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