import React from "react";

const Header = () => {
  return (
    <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          TaskFlow
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your work, one task at a time.
        </p>
      </div>

      <span className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
        My Board
      </span>
    </header>
  );
};

export default Header;
