import { useState } from 'react';
import { ChevronLeft, Upload, Save, Bell, CreditCard, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface SettingsProps {
  onNavigate: (page: any) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  // White-label settings
  const [logoUrl, setLogoUrl] = useState('');
  const [brandColor, setBrandColor] = useState('#1e40af');
  const [companyName, setCompanyName] = useState('My Fintech App');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    transactions: true,
    apiAlerts: true,
    weeklyReports: false,
    systemUpdates: true,
  });

  // Profile settings
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@client.com',
    phone: '+1 (555) 123-4567',
  });

  // Billing settings
  const currentPlan = {
    name: 'Professional',
    price: 299,
    features: [
      'Unlimited transactions',
      '5 API keys',
      'Priority support',
      'Advanced analytics',
      'White-label customization'
    ]
  };

  const invoices = [
    { id: 'INV-001', date: '2025-11-01', amount: 299, status: 'paid' },
    { id: 'INV-002', date: '2025-10-01', amount: 299, status: 'paid' },
    { id: 'INV-003', date: '2025-09-01', amount: 149, status: 'paid' },
  ];

  const handleSaveWhiteLabel = () => {
    toast.success('White-label settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated!');
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleUploadLogo = () => {
    // Simulate file upload
    setLogoUrl('https://via.placeholder.com/150');
    toast.success('Logo uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate('overview')}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Overview
      </button>

      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-600">Manage your account preferences and configurations</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="white-label" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="white-label">White-Label</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* White-Label Tab */}
        <TabsContent value="white-label">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-slate-900 mb-1">White-Label Customization</h3>
              <p className="text-sm text-slate-600">Customize the dashboard appearance for your brand</p>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                {logoUrl ? (
                  <div className="w-32 h-32 border-2 border-slate-200 rounded-lg flex items-center justify-center">
                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full" />
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50">
                    <Upload className="w-8 h-8 text-slate-400" />
                  </div>
                )}
                <Button onClick={handleUploadLogo} variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Logo
                </Button>
              </div>
              <p className="text-xs text-slate-500">Recommended: 400x400px, PNG or SVG</p>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            {/* Brand Color */}
            <div className="space-y-2">
              <Label htmlFor="brand-color">Primary Brand Color</Label>
              <div className="flex items-center gap-4">
                <input
                  id="brand-color"
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-20 h-10 border border-slate-300 rounded cursor-pointer"
                />
                <Input
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  placeholder="#1e40af"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-slate-200 pt-6">
              <Label className="mb-3 block">Preview</Label>
              <div className="border-2 border-slate-200 rounded-lg p-6" style={{ backgroundColor: `${brandColor}10` }}>
                <div className="flex items-center gap-3 mb-4">
                  {logoUrl && <img src={logoUrl} alt="Logo" className="w-12 h-12" />}
                  <div>
                    <p style={{ color: brandColor }}>{companyName}</p>
                    <p className="text-xs text-slate-600">Payment Dashboard</p>
                  </div>
                </div>
                <Button style={{ backgroundColor: brandColor }} className="text-white">
                  Sample Button
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveWhiteLabel} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-slate-900 mb-1">Notification Preferences</h3>
              <p className="text-sm text-slate-600">Choose what updates you want to receive</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-900">Transaction Alerts</p>
                    <p className="text-xs text-slate-500">Get notified for every transaction</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications.transactions}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, transactions: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-900">API Alerts</p>
                    <p className="text-xs text-slate-500">Errors, rate limits, and API status changes</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications.apiAlerts}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, apiAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-900">Weekly Reports</p>
                    <p className="text-xs text-slate-500">Summary of your activity each week</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, weeklyReports: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-900">System Updates</p>
                    <p className="text-xs text-slate-500">Platform upgrades and new features</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications.systemUpdates}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, systemUpdates: checked })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveNotifications} className="gap-2">
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-slate-900 mb-1">Current Plan</h3>
                  <p className="text-sm text-slate-600">Manage your subscription</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-blue-700">Current Plan</p>
                    <p className="text-blue-900 mt-1">{currentPlan.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-700">Monthly</p>
                    <p className="text-blue-900 mt-1">${currentPlan.price}/mo</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-blue-800 flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1">Change Plan</Button>
                <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">Cancel Subscription</Button>
              </div>
            </div>

            {/* Invoice History */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-slate-900 mb-4">Invoice History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm text-slate-600">Invoice ID</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-600">Date</th>
                      <th className="text-right py-3 px-4 text-sm text-slate-600">Amount</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-600">Status</th>
                      <th className="text-right py-3 px-4 text-sm text-slate-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 text-sm text-slate-900">{invoice.id}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{invoice.date}</td>
                        <td className="py-3 px-4 text-sm text-slate-900 text-right">
                          ${invoice.amount}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 mb-1">Profile Settings</h3>
                <p className="text-sm text-slate-600">Update your account information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email Address</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone Number</Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-slate-900 mb-3">Change Password</h4>
              <div className="space-y-3">
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm new password" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Reset Password</Button>
              <Button onClick={handleSaveProfile} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}