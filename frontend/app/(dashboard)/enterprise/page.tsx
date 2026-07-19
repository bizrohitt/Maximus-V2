export default function EnterpriseSettings() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Enterprise Settings</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-2xl p-8">
          <h3 className="font-semibold text-xl mb-4">SSO Configuration</h3>
          <p className="text-sm text-gray-600 mb-6">Connect your identity provider (SAML or OIDC).</p>
          <button className="bg-[var(--color-secondary)] text-white px-6 py-2.5 rounded-xl text-sm">
            Configure SSO
          </button>
        </div>

        <div className="border rounded-2xl p-8">
          <h3 className="font-semibold text-xl mb-4">Audit Logs</h3>
          <p className="text-sm text-gray-600 mb-6">View all actions performed in your organization.</p>
          <button className="border px-6 py-2.5 rounded-xl text-sm">
            View Audit Logs
          </button>
        </div>
      </div>
    </div>
  )
}