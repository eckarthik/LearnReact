import React from 'react';
import Link from 'next/link';

const errorPage = () => (
    <div>
        <h1>Opps, Page not found</h1>
        <p>Link <Link href="/"><a>Main Page</a></Link></p>
    </div>
);

export default errorPage;