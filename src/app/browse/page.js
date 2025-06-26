import { Suspense } from 'react';
import BrowseClient from './BrowseClient';

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowseClient />
    </Suspense>
  );
}