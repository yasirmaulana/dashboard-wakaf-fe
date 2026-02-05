import { ref, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(false)
const isMobileOpen = ref(false)

export const useLayout = () => {
    const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const toggleMobileSidebar = () => {
        isMobileOpen.value = !isMobileOpen.value
    }

    const closeMobileSidebar = () => {
        isMobileOpen.value = false
    }

    const checkMobile = () => {
        if (window.innerWidth >= 1024) { // lg breakpoint
            isMobileOpen.value = false
        }
    }

    onMounted(() => {
        window.addEventListener('resize', checkMobile)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)
    })

    return {
        isCollapsed,
        isMobileOpen,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar
    }
}
