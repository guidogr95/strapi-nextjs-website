import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'vexxhost-editor/build/ckeditor';
import styled from 'styled-components';
import 'vexxhost-editor/build/translations/ar';
import 'vexxhost-editor/build/translations/cs';
import 'vexxhost-editor/build/translations/de';
import 'vexxhost-editor/build/translations/es';
import 'vexxhost-editor/build/translations/fr';
import 'vexxhost-editor/build/translations/id';
import 'vexxhost-editor/build/translations/it';
import 'vexxhost-editor/build/translations/ko';
import 'vexxhost-editor/build/translations/nl';
import 'vexxhost-editor/build/translations/pl';
import 'vexxhost-editor/build/translations/pt';
import 'vexxhost-editor/build/translations/pt-br';
import 'vexxhost-editor/build/translations/ru';
import 'vexxhost-editor/build/translations/sk';
import 'vexxhost-editor/build/translations/th';
import 'vexxhost-editor/build/translations/tr';
import 'vexxhost-editor/build/translations/uk';
import 'vexxhost-editor/build/translations/vi';
import 'vexxhost-editor/build/translations/zh';

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const CustomEditor = ({ onChange, name, value, setEditor, config }) => {
  return (
    <Wrapper>
      <CKEditor
        editor={Editor}
        config={config}
        data={value}
	onReady={editor => {
          setEditor(editor);
          if (value) {
            editor.setData(value);
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
    </Wrapper>
  );
};

CustomEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default CustomEditor;
