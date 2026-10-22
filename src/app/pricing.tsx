const PRICE_GROUPS = [
  {
    title: "Full Body",
    note: "Free hot stone",
    rows: [
      ["30 min", "$40"],
      ["60 min", "$60"],
      ["90 min", "$90"],
    ],
  },
  {
    title: "Deep Tissue",
    note: "Free hot stone · 90 min includes free cupping",
    rows: [
      ["30 min", "$45"],
      ["60 min", "$70"],
      ["90 min", "$105"],
    ],
  },
  {
    title: "Foot Reflexology",
    note: "Free hot stone",
    rows: [
      ["30 min", "$35"],
      ["60 min", "$50"],
      ["90 min", "$80"],
      ["60 min with Chinese medicine pack", "$56"],
    ],
  },
  {
    title: "Combo",
    note: "Free hot stone",
    rows: [
      ["60 min back + 30 min foot", "$90"],
      ["60 min foot + 30 min back", "$85"],
      ["30 min back + 30 min foot", "$60"],
      ["30 min neck, shoulders, hands, arms & legs", "$45"],
      ["30 min skull massage", "$45"],
    ],
  },
  {
    title: "Enhancements",
    rows: [
      ["Ginger / wormwood oil massage", "$10"],
      ["10 min cupping", "$20"],
      ["10 min gua sha stone face & neck", "$20"],
    ],
  },
  {
    title: "Chinese Traditional Way",
    rows: [
      ["30 min", "$50"],
      ["60 min", "$100"],
      ["90 min", "$150"],
    ],
  },
] as const;

export function TextPrices() {
  return (
    <details className="mt-6 rounded-xl border border-brown-deep/15 text-left">
      <summary className="cursor-pointer px-5 py-4 font-semibold text-brown-deep hover:text-accent">
        View Prices as Text
      </summary>
      <div className="grid gap-8 px-5 pt-2 pb-6 sm:grid-cols-2">
        {PRICE_GROUPS.map((group) => (
          <section key={group.title}>
            <h3 className="font-serif text-xl text-brown-deep">
              {group.title}
            </h3>
            {"note" in group && (
              <p className="mt-1 text-sm text-gray-600">{group.note}</p>
            )}
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              {group.rows.map(([label, price]) => (
                <div key={label} className="flex justify-between gap-5">
                  <dt>{label}</dt>
                  <dd className="shrink-0 font-semibold tabular-nums">
                    {price}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </details>
  );
}
