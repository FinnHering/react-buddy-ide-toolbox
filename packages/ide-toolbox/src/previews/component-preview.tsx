import React, {useCallback} from 'react';
import {RoutePreview} from '../routing/route-preview';
import {PropsModifier, ToolsPropsModifier, PropsEditInfo} from '@types';
import {ErrorBoundary} from '../error-boundary/error-boundary';

interface Props {
  path: string;
  children: JSX.Element;
  propsEditInfo?: PropsEditInfo;
  setToolsPropsToEdit?: (toolsPropsModifier: ToolsPropsModifier) => void;
  exact?: boolean;
}

export const ComponentPreview: React.FC<Props> = ({
  path,
  children,
  setToolsPropsToEdit,
  exact = true,
  propsEditInfo,
}: Props) => {
  const setPropsToEdit = useCallback((propsToEdit: PropsModifier) => {
    setToolsPropsToEdit!({
      ...propsToEdit,
      initialProps: children.props,
      propsEditInfo,
    });
  }, []);

  return (
    <RoutePreview path={path} exact={exact} setPropsToEdit={setPropsToEdit!}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </RoutePreview>
  );
};
