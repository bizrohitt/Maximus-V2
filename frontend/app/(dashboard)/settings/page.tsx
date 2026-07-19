export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Tenant Settings</h1>
      
      <div className="space-y-8">
        <div className="border rounded-xl p-8">
          <h3 className="font-semibold mb-4">Branding</h3>
          <p className="text-sm text-gray-600">Customize logo, colors, and domain (Enterprise only).</p>
        </div>
        
        <div className="border rounded-xl p-8">
          <h3 className="font-semibold mb-4">SSO Configuration</h3>
          <p className="text-sm text-gray-600">Configure SAML or OIDC (Enterprise).</p>
        </div>
      </div>
    </div>
  )
}