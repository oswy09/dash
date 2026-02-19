<template>
  <div class="landing">
    <div class="container">
      <div class="header">
        <div class="brand">
          <div class="icon">{{ nicho?.icon }}</div>
          <span class="category">{{ nicho?.name }}</span>
        </div>
      </div>

      <div class="hero">
        <h1 class="hero-title">
          Propuesta de Diseño Web para <span class="highlight">{{ clientName }}</span>
        </h1>
        <p class="hero-description">{{ nicho?.description }}</p>
      </div>

      <!-- Selector de Planes -->
      <div class="customization-section" v-if="availablePlans.length > 1">
        <h2 class="section-title">Personaliza tu Propuesta</h2>
        <div class="plans-selector">
          <button
            v-for="p in availablePlans"
            :key="p.id"
            @click="selectedPlanId = p.id"
            :class="['plan-btn', { active: selectedPlanId === p.id }]"
          >
            <span class="plan-name">{{ p.name }}</span>
            <span class="plan-price">${{ p.price.toLocaleString() }}</span>
          </button>
        </div>
      </div>

      <!-- Servicios Adicionales -->
      <div class="extras-section" v-if="availableExtras.length > 0">
        <h2 class="section-title">Servicios Adicionales</h2>
        <div class="extras-grid">
          <div
            v-for="extra in availableExtras"
            :key="extra.id"
            class="extra-card"
          >
            <div class="extra-content">
              <div class="extra-header">
                <input
                  type="checkbox"
                  :id="`extra-${extra.id}`"
                  :checked="selectedExtrasIds.includes(extra.id)"
                  @change="toggleExtra(extra.id)"
                  class="extra-checkbox"
                />
                <label :for="`extra-${extra.id}`" class="extra-name">{{ extra.name }}</label>
              </div>
              <p class="extra-description">{{ extra.description }}</p>
              <p class="extra-price">+${{ extra.price.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="proposal-section">
        <div class="plan-header">
          <div class="plan-badge-container">
            <span class="plan-badge">Plan {{ plan?.name }}</span>
          </div>
          <div class="price-container">
            <span class="price-label">Inversión Total</span>
            <div class="price">
              <span class="currency">$</span>
              <span class="amount">{{ totalPrice.toLocaleString() }}</span>
              <span class="period">USD</span>
            </div>
          </div>
        </div>

        <div class="features-section">
          <h2 class="features-title">Qué incluye tu proyecto</h2>
          <div class="features-grid">
            <div
              v-for="(feature, index) in plan?.features"
              :key="index"
              class="feature-card"
            >
              <div class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Extras Seleccionados -->
        <div class="selected-extras" v-if="selectedExtras.length > 0">
          <h3 class="extras-title">Servicios Adicionales Contratados</h3>
          <div class="extras-list">
            <div v-for="extra in selectedExtras" :key="extra.id" class="extra-item">
              <span>{{ extra.name }}</span>
              <span class="extra-item-price">+${{ extra.price.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <button @click="acceptProposal" class="btn-accept">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Aceptar Presupuesto
          </button>
          <p class="cta-note">
            Al aceptar, nos pondremos en contacto contigo en las próximas 24 horas
          </p>
        </div>

        <div v-if="accepted" class="success-message">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#10B981" opacity="0.1"/>
              <path d="M21.3333 12L14 19.3333L10.6667 16" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>¡Propuesta Aceptada!</h3>
          <p>Nos pondremos en contacto contigo pronto. Gracias por confiar en nosotros.</p>
        </div>
      </div>

      <footer class="footer">
        <p>Propuesta generada por <strong>ProposalGen</strong></p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useData } from '../composables/useData';

const route = useRoute();
const accepted = ref(false);
const selectedExtrasIds = ref<string[]>([]);
const selectedPlanId = ref<string>('');

const { categories, plans, extras, loadAll } = useData();

const clientName = computed(() => route.query.cliente as string || 'Tu Negocio');
const categoryId = computed(() => route.query.categoryId as string);

const nicho = computed(() => categories.value.find(c => c.id === categoryId.value));
const availablePlans = computed(() => plans.value.filter(p => p.category_id === categoryId.value));
const availableExtras = computed(() => extras.value);

const plan = computed(() => plans.value.find(p => p.id === selectedPlanId.value));

const selectedExtras = computed(() => 
  extras.value.filter(e => selectedExtrasIds.value.includes(e.id))
);

const totalPrice = computed(() => {
  let total = plan.value?.price || 0;
  selectedExtras.value.forEach(extra => {
    total += extra.price;
  });
  return total;
});

const toggleExtra = (extraId: string) => {
  const index = selectedExtrasIds.value.indexOf(extraId);
  if (index > -1) {
    selectedExtrasIds.value.splice(index, 1);
  } else {
    selectedExtrasIds.value.push(extraId);
  }
};

const acceptProposal = () => {
  accepted.value = true;
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 100);
};

onMounted(async () => {
  await loadAll();
  // Set initial plan from query or first available
  if (route.query.planId) {
    selectedPlanId.value = route.query.planId as string;
  } else if (availablePlans.value.length > 0) {
    selectedPlanId.value = availablePlans.value[0].id;
  }
  
  if (!nicho.value || !plan.value) {
    console.error('Datos de propuesta no encontrados');
  }
});
</script>

<style scoped>
.landing {
  min-height: 100vh;
  background: linear-gradient(135deg, #FAFAFA 0%, #F8F9FC 100%);
  padding: 48px 24px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.icon {
  font-size: 28px;
}

.category {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.hero {
  text-align: center;
  margin-bottom: 64px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
  line-height: 1.2;
}

.highlight {
  color: #5D3FD3;
  position: relative;
}

.hero-description {
  font-size: 20px;
  color: #6B7280;
  margin: 0;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.proposal-section {
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 48px;
  margin-bottom: 32px;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
  margin-bottom: 40px;
  border-bottom: 2px solid #F3F4F6;
}

.plan-badge-container {
  flex: 1;
}

.plan-badge {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #5D3FD3 0%, #7C3AED 100%);
  color: white;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(93, 63, 211, 0.25);
}

.price-container {
  text-align: right;
}

.price-label {
  display: block;
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 6px;
}

.currency {
  font-size: 28px;
  color: #5D3FD3;
  font-weight: 700;
}

.amount {
  font-size: 56px;
  font-weight: 700;
  color: #5D3FD3;
  line-height: 1;
}

.period {
  font-size: 20px;
  color: #6B7280;
  font-weight: 600;
}

.features-section {
  margin-bottom: 48px;
}

.features-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px 0;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.feature-card:hover {
  background: #F5F3FF;
  transform: translateX(4px);
}

.feature-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #5D3FD3 0%, #7C3AED 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-text {
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  line-height: 1.5;
  padding-top: 8px;
}

.cta-section {
  text-align: center;
  padding-top: 32px;
  border-top: 2px solid #F3F4F6;
}

.btn-accept {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 48px;
  background: linear-gradient(135deg, #5D3FD3 0%, #7C3AED 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(93, 63, 211, 0.3);
}

.btn-accept:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(93, 63, 211, 0.4);
}

.btn-accept:active {
  transform: translateY(0);
}

.cta-note {
  margin-top: 16px;
  font-size: 14px;
  color: #6B7280;
}

.success-message {
  margin-top: 32px;
  padding: 32px;
  background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
  border-radius: 16px;
  text-align: center;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.success-message h3 {
  font-size: 24px;
  font-weight: 700;
  color: #065F46;
  margin: 0 0 8px 0;
}

.success-message p {
  font-size: 16px;
  color: #047857;
  margin: 0;
}

.footer {
  text-align: center;
  padding: 24px;
  color: #9CA3AF;
  font-size: 14px;
}

.footer strong {
  color: #5D3FD3;
  font-weight: 700;
}

.customization-section {
  background: white;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.plans-selector {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.plan-btn {
  flex: 1;
  min-width: 150px;
  padding: 20px 24px;
  border: 2px solid #E5E7EB;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.plan-btn:hover {
  border-color: #5D3FD3;
  box-shadow: 0 4px 12px rgba(93, 63, 211, 0.1);
}

.plan-btn.active {
  border-color: #5D3FD3;
  background: linear-gradient(135deg, #FAFAFA 0%, #F5F3FF 100%);
  box-shadow: 0 8px 24px rgba(93, 63, 211, 0.15);
}

.plan-name {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.plan-price {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #5D3FD3;
}

.extras-section {
  background: white;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.extras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.extra-card {
  border: 2px solid #E5E7EB;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.extra-card:hover {
  border-color: #5D3FD3;
  box-shadow: 0 4px 12px rgba(93, 63, 211, 0.1);
}

.extra-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.extra-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.extra-checkbox {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #5D3FD3;
}

.extra-name {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  cursor: pointer;
}

.extra-description {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
}

.extra-price {
  font-size: 16px;
  font-weight: 700;
  color: #5D3FD3;
  margin: 8px 0 0 0;
}

.selected-extras {
  background: #F9FAFB;
  border-radius: 16px;
  padding: 24px;
  margin: 32px 0 24px 0;
}

.extras-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
}

.extras-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.extra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #5D3FD3;
}

.extra-item-price {
  font-weight: 700;
  color: #5D3FD3;
}

@media (max-width: 768px) {
  .landing {
    padding: 24px 16px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-description {
    font-size: 16px;
  }

  .proposal-section {
    padding: 32px 24px;
  }

  .plan-header {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }

  .price-container {
    text-align: left;
  }

  .price {
    justify-content: flex-start;
  }

  .amount {
    font-size: 40px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .btn-accept {
    width: 100%;
    padding: 18px 32px;
  }
}
</style>
