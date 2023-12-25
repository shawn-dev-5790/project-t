export function performanceChecker(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    const delta = Number(args)
    const start = performance.now() // 측정 시작
    const result = originalMethod.apply(this, args)
    const end = performance.now() // 측정 종료
    const executionTime = (end - start) / 1000 // 밀리초 단위로 환산 delta와 비교하기 위함
    // const memoryUseRate = Number(((executionTime / delta) * 100).toFixed(2))
    console.log([key, `memory uses ${((executionTime / delta) * 100).toFixed(2)}%`, executionTime.toFixed(3), delta.toFixed(3)])

    return result
  }

  return descriptor
}
