
const callouts = [
    {
      name: 'Xiaomi',
      description: 'Thiết kế đầy hoang dại',
      imageSrc: 'https://kenh14cdn.com/thumb_w/640/pr/2021/1619693263776-3-0-896-1430-crop-1619693269700-63755321105296.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Samsung Galaxy X',
      description: 'Hiện đại và cải tiến',
      imageSrc: 'https://cdn.tgdd.vn/Files/2018/05/10/1087515/ro-ri-hinh-anh-chiec-dien-thoai-gap-man-hinh-doc-dao-cua-samsung-3.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Samsung Galaxy S23',
      description: 'Điện thoại chơi game tốt',
      imageSrc: 'https://mtsmart.vn/uploads/blog/den-luot-galaxy-s23-xuat-hien-tuyet-dep-trong-bo-suu-tap-moi-230114011038.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]
  
  export default function NewProduct() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Mới nhất</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  