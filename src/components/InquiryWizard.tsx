import { useState } from 'preact/hooks';
import styles from './InquiryWizard.module.css';

interface WizardData {
  projectType: string;
  planningStatus: string;
  budget: string;
  postcode: string;
  conservationArea: string;
  freeholdStatus: string;
  name: string;
  email: string;
  phone: string;
  consultationMethod: string;
}

const projectTypes = [
  { id: 'renovation', label: 'Full Renovation', description: 'Stripping back to brick', icon: '🏗️' },
  { id: 'extension', label: 'Extension / Basement', description: 'Adding structural volume', icon: '📐' },
  { id: 'newbuild', label: 'New Build', description: 'Ground-up construction', icon: '🏛️' },
  { id: 'heritage', label: 'Heritage Restoration', description: 'Grade I/II Listed works', icon: '🏰' },
];

const planningStatuses = [
  { id: 'dreaming', label: 'Just Dreaming', description: 'No property yet / Just purchased' },
  { id: 'concept', label: 'Concept Phase', description: 'We know what we want, but have no drawings' },
  { id: 'approved', label: 'Planning Submitted/Approved', description: 'We have permission, need detailed design' },
  { id: 'rescue', label: 'Rescue Mission', description: 'We have drawings/builders, but it\'s going wrong' },
];

const budgets = [
  { id: '100-250', label: '£100k - £250k', focus: 'Micro-extensions' },
  { id: '250-500', label: '£250k - £500k', focus: 'Standard Renovations' },
  { id: '500-1000', label: '£500k - £1M', focus: 'High-end Structural' },
  { id: '1000+', label: '£1M+', focus: 'Luxury / Complete Rebuilds' },
];

const consultationMethods = [
  'At Palace Court',
  'On Site',
  'Zoom',
];

export default function InquiryWizard() {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState<WizardData>({
    projectType: '',
    planningStatus: '',
    budget: '',
    postcode: '',
    conservationArea: '',
    freeholdStatus: '',
    name: '',
    email: '',
    phone: '',
    consultationMethod: '',
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const updateData = (field: keyof WizardData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const nextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const prevStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.projectType !== '';
      case 2:
        return data.planningStatus !== '';
      case 3:
        return data.budget !== '';
      case 4:
        return data.postcode !== '' && data.conservationArea !== '' && data.freeholdStatus !== '';
      case 5:
        return data.name !== '' && data.email !== '' && data.phone !== '' && data.consultationMethod !== '';
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      // Submit data to API endpoint
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      // Redirect to success page with data in URL params for personalization
      const params = new URLSearchParams({
        postcode: data.postcode,
        projectType: data.projectType,
      });
      window.location.href = `/inquiry-success?${params.toString()}`;
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again or contact us directly at hello@hampsteadarchitects.co.uk');
    }
  };

  return (
    <div class={styles['inquiry-wizard']}>
      {/* Progress Bar */}
      <div class={styles['wizard-progress']}>
        <div
          class={styles['wizard-progress-bar']}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicator */}
      <div class={styles['wizard-step-indicator']}>
        Step {step} of {totalSteps}
      </div>

      {/* Content */}
      <div class={`${styles['wizard-content']} ${isTransitioning ? styles['transitioning'] : ''}`}>
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div class={styles['wizard-step']}>
            <h2 class={styles['wizard-heading']}>What is the vision for the property?</h2>
            <div class={styles['wizard-cards']}>
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  class={`${styles['wizard-card']} ${data.projectType === type.id ? styles['active'] : ''}`}
                  onClick={() => updateData('projectType', type.id)}
                >
                  <span class={styles['wizard-card-icon']}>{type.icon}</span>
                  <span class={styles['wizard-card-label']}>{type.label}</span>
                  <span class={styles['wizard-card-description']}>{type.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Planning Status */}
        {step === 2 && (
          <div class={styles['wizard-step']}>
            <h2 class={styles['wizard-heading']}>Where are we in the journey?</h2>
            <div class={styles['wizard-radios']}>
              {planningStatuses.map((status) => (
                <label
                  key={status.id}
                  class={`${styles['wizard-radio']} ${data.planningStatus === status.id ? styles['active'] : ''}`}
                >
                  <input
                    type="radio"
                    name="planningStatus"
                    value={status.id}
                    checked={data.planningStatus === status.id}
                    onInput={(e) => updateData('planningStatus', (e.target as HTMLInputElement).value)}
                  />
                  <div class={styles['wizard-radio-content']}>
                    <span class={styles['wizard-radio-label']}>{status.label}</span>
                    <span class={styles['wizard-radio-description']}>{status.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div class={styles['wizard-step']}>
            <h2 class={styles['wizard-heading']}>
              To match you with the right architect, we need to understand the scale.
            </h2>
            <p class={styles['wizard-note']}>
              This is confidential and ensures we don't propose unbuildable concepts.
            </p>
            <div class={styles['wizard-radios']}>
              {budgets.map((budget) => (
                <label
                  key={budget.id}
                  class={`${styles['wizard-radio']} ${data.budget === budget.id ? styles['active'] : ''}`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={budget.id}
                    checked={data.budget === budget.id}
                    onInput={(e) => updateData('budget', (e.target as HTMLInputElement).value)}
                  />
                  <div class={styles['wizard-radio-content']}>
                    <span class={styles['wizard-radio-label']}>{budget.label}</span>
                    <span class={styles['wizard-radio-description']}>Focus: {budget.focus}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Property Details */}
        {step === 4 && (
          <div class={styles['wizard-step']}>
            <h2 class={styles['wizard-heading']}>Tell us about the site.</h2>
            <div class={styles['wizard-fields']}>
              <div class={styles['wizard-field']}>
                <label for="postcode" class={styles['wizard-label']}>Postcode</label>
                <input
                  type="text"
                  id="postcode"
                  class={styles['wizard-input']}
                  placeholder="NW3 6DN"
                  value={data.postcode}
                  onInput={(e) => updateData('postcode', (e.target as HTMLInputElement).value)}
                />
              </div>

              <div class={styles['wizard-field']}>
                <label class={styles['wizard-label']}>Conservation Area</label>
                <div class={styles['wizard-button-group']}>
                  {['Yes', 'No', 'Unsure'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      class={`${styles['wizard-button']} ${data.conservationArea === option ? styles['active'] : ''}`}
                      onClick={() => updateData('conservationArea', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div class={styles['wizard-field']}>
                <label class={styles['wizard-label']}>Freehold Status</label>
                <select
                  class={styles['wizard-select']}
                  value={data.freeholdStatus}
                  onInput={(e) => updateData('freeholdStatus', (e.target as HTMLSelectElement).value)}
                >
                  <option value="">Select...</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                  <option value="share">Share of Freehold</option>
                </select>
                {data.freeholdStatus === 'leasehold' && (
                  <p class={styles['wizard-tooltip']}>
                    Note: We will need to check License to Alter requirements.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Contact Details */}
        {step === 5 && (
          <div class={styles['wizard-step']}>
            <h2 class={styles['wizard-heading']}>Where should we send the prospectus?</h2>
            <div class={styles['wizard-fields']}>
              <div class={styles['wizard-field']}>
                <label for="name" class={styles['wizard-label']}>Name</label>
                <input
                  type="text"
                  id="name"
                  class={styles['wizard-input']}
                  value={data.name}
                  onInput={(e) => updateData('name', (e.target as HTMLInputElement).value)}
                />
              </div>

              <div class={styles['wizard-field']}>
                <label for="email" class={styles['wizard-label']}>Email</label>
                <input
                  type="email"
                  id="email"
                  class={styles['wizard-input']}
                  placeholder="Professional email preferred"
                  value={data.email}
                  onInput={(e) => updateData('email', (e.target as HTMLInputElement).value)}
                />
              </div>

              <div class={styles['wizard-field']}>
                <label for="phone" class={styles['wizard-label']}>Phone</label>
                <input
                  type="tel"
                  id="phone"
                  class={styles['wizard-input']}
                  value={data.phone}
                  onInput={(e) => updateData('phone', (e.target as HTMLInputElement).value)}
                />
              </div>

              <div class={styles['wizard-field']}>
                <label class={styles['wizard-label']}>Preferred Consultation Method</label>
                <div class={styles['wizard-button-group']}>
                  {consultationMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      class={`${styles['wizard-button']} ${data.consultationMethod === method ? styles['active'] : ''}`}
                      onClick={() => updateData('consultationMethod', method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div class={styles['wizard-navigation']}>
        {step > 1 && (
          <button
            type="button"
            class={`${styles['wizard-nav-button']} ${styles['wizard-nav-prev']}`}
            onClick={prevStep}
          >
            ← Previous
          </button>
        )}
        {step < totalSteps && (
          <button
            type="button"
            class={`${styles['wizard-nav-button']} ${styles['wizard-nav-next']}`}
            onClick={nextStep}
            disabled={!canProceed()}
          >
            Next →
          </button>
        )}
        {step === totalSteps && (
          <button
            type="button"
            class={`${styles['wizard-nav-button']} ${styles['wizard-nav-submit']}`}
            onClick={handleSubmit}
            disabled={!canProceed()}
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}
