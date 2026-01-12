import { X } from 'lucide-react';
import { Button } from './ui/button';

interface EnableChurnScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnableChurnScoreModal({ isOpen, onClose }: EnableChurnScoreModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Enable Churn Score</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-gray-800 text-sm leading-relaxed">
              Thanks for showing interest in the <strong>Churn Score</strong> feature! As part of our{' '}
              <strong>Early Access Program</strong>, we'll be enabling this for your Billing account. Here's what you can expect:
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Churn Score?</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Churn Score is a predictive indicator that helps you identify which of your active subscriptions are at risk of canceling in the near future.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does Churn Score work?</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We look at billing patterns (failed payments, cancellations, downgrades, invoice activity) in your Chargebee account and apply a prediction model to estimate the likelihood of churn.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What do you get?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm ml-2">
              <li>A score at the customer level, refreshed every week</li>
              <li>A view of churn risk directly in the customer profile page</li>
              <li>Early warning signals so your team can proactively engage at-risk customers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How does Churn Score work in your account?</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Default Settings Applied:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  No setup required on your side. We'll use standard billing indicators such as failed payments, subscription cancellations, downgrades, and invoice activity.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Prediction Window:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  By default, we'll calculate churn risk over the next 90 days (adjustable in later phases).
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Churn Scores Visibility:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  You'll see churn scores at the subscription level, accessible in your customer profile page.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Weekly Refresh:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Churn scores will be refreshed every week based on your latest data.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Usage:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Use these scores to identify at-risk subscriptions early and take proactive action.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">We'll be reaching out to get your feedback on:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm ml-2">
              <li>How useful you find the scores in your day-to-day workflows</li>
              <li>Preferred ways of viewing or exporting the churn scores</li>
            </ul>
            <p className="text-gray-700 text-sm leading-relaxed mt-3">
              Your feedback will directly shape how we improve and roll out this feature more broadly.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-800 text-sm leading-relaxed mb-2">
              <strong>Would you like us to enable churn scores this week, so you can start seeing them in action?</strong>
            </p>
            <p className="text-gray-600 text-sm italic">
              Thanks again for being an early partner,
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: '#ffab84' }}
            onClick={() => {
              onClose();
            }}
            className="px-6 text-white hover:opacity-90"
          >
            Enable Churn Score
          </Button>
        </div>
      </div>
    </div>
  );
}
