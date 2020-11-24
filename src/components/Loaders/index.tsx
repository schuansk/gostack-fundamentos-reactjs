import React from 'react';
import ContentLoader from 'react-content-loader';

export const TableLoader: React.FC = props => (
  <ContentLoader
    speed={2}
    width={920}
    height={160}
    viewBox="0 0 920 200"
    backgroundColor="#e6e6e6"
    foregroundColor="#f3f3f3"
    {...props}
  >
    <rect x="0" y="90" rx="3" ry="3" width="220" height="20" />
    <rect x="240" y="90" rx="3" ry="3" width="220" height="20" />
    <rect x="480" y="90" rx="3" ry="3" width="220" height="20" />
    <rect x="720" y="90" rx="3" ry="3" width="220" height="20" />
  </ContentLoader>
);

export const ValueLoader: React.FC = props => (
  <ContentLoader
    speed={2}
    width={200}
    height={30}
    viewBox="0 0 200 30"
    backgroundColor="#e6e6e6"
    foregroundColor="#f3f3f3"
    {...props}
  >
    <rect x="0" y="16" rx="0" ry="0" width="150" height="20" />
  </ContentLoader>
);
