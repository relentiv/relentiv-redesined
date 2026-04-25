type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
};

export function FAQSection({ title = "Common Questions", items }: FAQSectionProps) {
  return (
    <section className="w-full border-t border-white/10 bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
          FAQ
        </p>
        <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="cursor-pointer list-none text-lg font-medium text-white marker:hidden">
                <span className="flex items-center justify-between gap-6">
                  {item.question}
                  <span className="text-2xl font-light text-white/45 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/60">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

