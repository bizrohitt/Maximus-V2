export default function BillingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-xl p-8">
          <h3 className="font-semibold text-xl mb-4">Current Plan</h3>
          <p className="text-2xl font-bold text-[var(--color-secondary)]">Free</p>
          <button className="mt-6 bg-[var(--color-secondary)] text-white px-6 py-2.5 rounded-lg">
            Upgrade Plan
          </button>
        </div>
        
        <div className="border rounded-xl p-8">
          <h3 className="font-semibold text-xl mb-4">Billing History</h3>
          <p className="text-sm text-gray-600">No invoices yet.</p>
        </div>
      </div>
    </div>
  )
}