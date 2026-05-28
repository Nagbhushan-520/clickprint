import Link from "next/link";
import { Package, IndianRupee, Clock, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { listOrders, STATUS_COLOR, STATUS_LABEL } from "@/lib/store/orders";
import { formatINR } from "@/lib/utils";
import { pageMetadata } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Admin Orders",
  description: "Internal admin dashboard.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage() {
  const orders = await listOrders();

  const totalRevenue = orders
    .filter((o) => ["paid", "in_production", "ready", "shipped", "delivered"].includes(o.status))
    .reduce((sum, o) => sum + o.pricing.total, 0);

  const pending = orders.filter((o) =>
    ["draft", "design_pending", "payment_pending"].includes(o.status),
  ).length;
  const inProduction = orders.filter((o) => o.status === "in_production").length;
  const completed = orders.filter((o) => ["delivered", "shipped", "ready"].includes(o.status)).length;

  return (
    <div className="pt-24 pb-32 md:pt-32">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="chip">Admin · Internal</div>
            <h1 className="mt-5 text-display text-balance text-ink-900">
              Orders <span className="text-flame-500">dashboard.</span>
            </h1>
          </div>
          <div className="text-xs text-ink-500">
            Demo mode · not behind auth · add auth before deploying
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={Package}
            label="Total orders"
            value={orders.length.toString()}
            accent="bg-ink-900 text-paper"
          />
          <Stat
            icon={IndianRupee}
            label="Revenue (paid)"
            value={formatINR(totalRevenue)}
            accent="bg-flame-500 text-paper"
          />
          <Stat
            icon={Clock}
            label="Pending"
            value={pending.toString()}
            accent="bg-saffron-500 text-ink-900"
          />
          <Stat
            icon={CheckCircle2}
            label="Completed"
            value={completed.toString()}
            accent="bg-green-600 text-paper"
          />
        </div>

        {/* Orders table */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
            All orders
          </h2>
          <div className="mt-5 overflow-hidden rounded-3xl border border-ink-900/10 bg-paper">
            {orders.length === 0 ? (
              <div className="grid place-items-center px-8 py-20 text-center">
                <Package className="h-12 w-12 text-ink-300" strokeWidth={1} />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">No orders yet</h3>
                <p className="mt-2 max-w-md text-sm text-ink-500">
                  Once customers start placing orders, they'll show up here. Try the configurator at <Link className="text-flame-500 hover:underline" href="/order">/order</Link>.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-ink-900 text-paper">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">Order ID</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">Customer</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">Specs</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-widest">Total</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">Status</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest">File</th>
                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-widest">Open</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <tr key={order.id} className={i % 2 === 0 ? "bg-paper" : "bg-cream"}>
                        <td className="px-5 py-3.5">
                          <div className="font-display text-sm font-semibold text-ink-900">#{order.id}</div>
                          <div className="text-[10px] text-ink-500">
                            {new Date(order.createdAt).toLocaleString("en-IN", {
                              day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm">
                          {order.customer ? (
                            <>
                              <div className="font-medium text-ink-900">{order.customer.name}</div>
                              <div className="text-xs text-ink-500">{order.customer.phone}</div>
                            </>
                          ) : (
                            <span className="text-xs text-ink-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs">
                          <div className="text-ink-900">
                            {order.config.size} · {order.config.colorMode === "single" ? "Single" : "Full"} color · {order.config.gsm} GSM
                          </div>
                          <div className="text-ink-500">
                            {order.config.quantity.toLocaleString("en-IN")} · {order.config.sides} side
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="font-display text-sm font-semibold text-ink-900">
                            {formatINR(order.pricing.total)}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${STATUS_COLOR[order.status]}`}>
                            {STATUS_LABEL[order.status]}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          {order.uploadedFile ? (
                            <a
                              href={order.uploadedFile.storedPath}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-flame-500 hover:underline"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              View file
                            </a>
                          ) : (
                            <span className="text-xs text-ink-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Link
                            href={`/order/${order.id}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-ink-700 hover:text-flame-500"
                          >
                            Open
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-3xl border border-ink-900/8 bg-paper p-6">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${accent}`}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-900">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-ink-500">
        {label}
      </div>
    </div>
  );
}
