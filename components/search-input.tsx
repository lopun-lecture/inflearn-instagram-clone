"use client";

import { Input } from "components/material-tailwind";

export default function SearchInput({ search, setSearch }) {
  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      label="Search Movies"
      icon={<i className="fas fa-search" />}
    />
  );
}
